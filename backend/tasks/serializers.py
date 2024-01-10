# serializers.py

from rest_framework import serializers
from .models import User, Employee, Task
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class EmployeeSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    # to return the whole object we need to write this line!!!
    class Meta:  
        model = Employee 
        fields = ['user', 'first_name', 'last_name']



class TaskSerializer(serializers.ModelSerializer):
    class Meta:  
        model = Task  
        fields = ['id', 'description', 'status', 'employee']