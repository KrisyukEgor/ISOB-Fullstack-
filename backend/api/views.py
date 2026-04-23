from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets
from .serializer import RegisterRequestSerializer, RegisterResponseSerializer, LogoutSerializer, TodoSerializer, UserSerializer
from drf_spectacular.utils import extend_schema, OpenApiTypes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Todo
from django.db import connection, transaction
from django.contrib.auth import get_user_model

User = get_user_model()

@extend_schema(
    auth=[],
    request= RegisterRequestSerializer,
    responses=RegisterResponseSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterRequestSerializer(data = request.data)

    if serializer.is_valid():
        with transaction.atomic():
            user = serializer.save()

        refresh = RefreshToken.for_user(user)

        response_data = {
            "user": {
                "id": user.id,
                "email": user.email,
            },
            "access": str(refresh.access_token),
        }

        response = Response(response_data, status=status.HTTP_201_CREATED)
        
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=False,  
            samesite='Lax',
            path='/api/token/refresh/', 
        )
        
        return response
    
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@extend_schema(
    auth=[],
    request=TokenObtainPairSerializer, 
    responses={200: RegisterResponseSerializer} 
)
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    serializer = TokenObtainPairSerializer(data=request.data)

    try:
        serializer.is_valid(raise_exception=True)
    except Exception as e:
        return Response({"detail": "Неверный email или пароль"}, status=status.HTTP_401_UNAUTHORIZED)

    user = serializer.user
    tokens = serializer.validated_data

    response = Response({
        "user": {
            "id": user.id,
            "email": user.email,
        },
        "access": tokens['access'],
    }, status=status.HTTP_200_OK)

    response.set_cookie(
        key='refresh_token',
        value=tokens['refresh'],
        httponly=True,
        secure=False,  
        samesite='Lax',
        path='/api/token/refresh/', 
    )

    return response

@extend_schema(
    request=LogoutSerializer,
    responses={202: OpenApiTypes.OBJECT}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    
    refresh_token = request.data.get('refresh') or request.COOKIES.get('refresh_token')

    if not refresh_token:
        return Response({"error": "No token provided"}, status=400)
    
    try: 
        token = RefreshToken(refresh_token)
        token.blacklist()

        response = Response({"message": "Logout success"}, status = status.HTTP_202_ACCEPTED)
        response.delete_cookie('refresh_token')
        return response
    except:
        return Response({"error": "Invalid token"}, status = status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def unsafe_search(request):
    title_query = request.query_params.get('title', '')

    sql = f"SELECT id, title, description FROM api_todo WHERE title = '{title_query}'"

    with connection.cursor() as cursor:
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return Response(results, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def safe_search(request):
    title_query = request.query_params.get('title', '')

    sql = "SELECT id, title, description FROM api_todo WHERE title = %s"
    params = [title_query]

    with connection.cursor() as cursor:
        cursor.execute(sql, params)  
        columns = [col[0] for col in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return Response(results, status=status.HTTP_200_OK)