from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    #everything is imported from parent class, we just inheriting it in our User model class
    pass


class Task(models.Model):
    description = models.TextField()
    status = models.BooleanField(default=False)

    # create Relationships  
    employee = models.ForeignKey('Employee', on_delete=models.CASCADE)
   

    def __str__(self): 
        return f'The task is assgined to  = {self.employee.first_name} {self.employee.last_name} and taskName = {self.description}!!'


class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)

    def __str__(self):
        return f'This is {self.first_name} {self.last_name} , The email = {self.user.email}'
    

# Using angular frontend make a service to check if current user is superuser/manager not not
# if superuser allow him to make new employees
# user is also an employee
# while creating new employee fetch the correct user using first_name and last_name and map them
# So when the user login, get the employee too (by firstname and lastname) and show the task assgined to him
# User.id -> Employee.user_id mapped hai use it 
    

