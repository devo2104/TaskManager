from django.http import JsonResponse
from .models import Task, Employee, User
from django.core.serializers import serialize
import json
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserSerializer, EmployeeSerializer, TaskSerializer
from rest_framework.authtoken.models import Token
# Create your views here.


# First populate the html page with all the employees
# to do that call apiService to fetch all employees from backend
# then make a dropdown menu to select the employee to whom this task should be assigned
# then handle the request in backend task_create view and create a new task with employee assgined..


def get_employees(request):
    if(request.method == 'GET'):
        employees = Employee.objects.all()
        serialized_emp = serialize('json', employees)
        serialized_emp = json.loads(serialized_emp)

        print(serialized_emp)
        employees = [{'id': emp['pk'], **emp['fields']} for emp in serialized_emp]
        print(employees)
    return JsonResponse({'employees': employees})

# there is a reason why i can't add login_required here , because it getting called from another server
# and django only handles it's server user for authentication, when you request from outside
# it will declare you Anonmyous User
def task_list(request):
    print(request.user.is_authenticated, request.user)
    tasks = Task.objects.all()
     # list of objects
    serialized_data = serialize('json', tasks) 
    # converted int json string
    serialized_data = json.loads(serialized_data) 
    #  it is used to deserialize a JSON-formatted string into a Python list of dictionaries..

    tasks = [{'id': task['pk'], **task['fields']} for task in serialized_data]
    # [{'id': 1, 'description': 'This is Task1', 'status': False, 'employee': 1}]
    print(tasks)
    return JsonResponse({'tasks': tasks}, status=200) 


def task_detail(request, pk):
    print('Hello--------------', request.path, pk)
    task = Task.objects.get(id=pk)
    employee_name = task.employee.first_name
    print(task.employee.first_name)
    serialized_task = serialize('json', [task])
    serialized_task = json.loads(serialized_task)
    status = 'Incomplete' if not task.status else 'Complete'
    task = {
        'id': serialized_task[0]['pk'],
        'description': serialized_task[0]['fields']['description'],
        'status': status,
        'employee': serialized_task[0]['fields']['employee']
    }
    print(task)
    return JsonResponse({'task': task, 'emp': employee_name}, status=200)


@csrf_exempt
def task_create(request):
    if(request.method == 'POST'):
        print('Receiving a post request')
        # assgined employee will be handled in backend by user dropdown menu option filter in employee table
        print(request.body, request.user)
        data = json.loads(request.body.decode('utf-8'))
        description = data.get('description', '')
        status = data.get('status', '')
        employee = data.get('employee', '')
        print(data, description, status, employee)
        employee = Employee.objects.get(pk=employee)
        print('The user is -----------------', employee.user)
        Task.objects.create(description=description,status=status,employee=employee)
        print('Task has been added to database')
    return JsonResponse({'message': 'The view page is not the purpose for this view, post the url'})



@csrf_exempt
def task_update(request, pk):
    print('Reached view')
    task = Task.objects.get(id=pk)
    print(request.body) 
    data = json.loads(request.body.decode('utf-8')) # convert json to python dictionary
    description = data.get('description', '')
    status = data.get('status', '')
    employee = data.get('employee', '')
    emp = Employee.objects.get(id=employee)
    print(status)
    task.description = description 
    task.status = True if status == "true" else False
    task.employee = emp
    task.save()
    serialized_task = serialize('json', [task])
    serialized_task = json.loads(serialized_task)
    return JsonResponse({'updatedTask': serialized_task})


@csrf_exempt
def task_update_for_regular_user(request, pk):
    task = Task.objects.get(id=pk)
    data = json.loads(request.body.decode('utf-8')) # convert json to python dictionary
    status = data.get('status', '')
    task.status = True if status == "true" else False
    task.save()
    serialized_task = serialize('json', [task])
    serialized_task = json.loads(serialized_task)
    return JsonResponse({'updatedTask': serialized_task})


@csrf_exempt
def task_delete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return JsonResponse({'message': 'Deleted Task successfully'})



#sign up new users
class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            user = serializer.save() # serializer is connected to my custom User Model
            print(user)
            return JsonResponse({'user': serializer.data, 'status': status.HTTP_201_CREATED})
        return JsonResponse({'message': serializer.errors, 'status': status.HTTP_400_BAD_REQUEST})
    


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username', '')
        password = request.data.get('password', '') 
        # i was not able to authenticate the user because the password was not hashed!!

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        

        if user.check_password(password):
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                print(request.user, user)
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserSerializer(user)
                data = {'token': token.key, 'user': serializer.data}
                return JsonResponse(data, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return JsonResponse({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            


        

def check_superuser(request, username):
    user = User.objects.get(username=username)
    print('User----------------------',user)
    if user.is_superuser: 
        return JsonResponse({'superUser': True})
    else:
        return JsonResponse({'superUser': False})
    


def user_exists(firstname, lastname):
    return User.objects.filter(first_name=firstname, last_name=lastname).exists()

@csrf_exempt 
def create_employee(request):
    # get the user associated with it
    print(request.method) 
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        # print(first_name, last_name, user_exists(first_name, last_name))
        if user_exists(first_name, last_name) == False:
            print('Welcome--------------')
            Email = first_name + '@gmail.com'
            username = data.get('username', first_name)
            password = data.get('password', first_name)
            email = data.get('email', Email)
            print(first_name, last_name, email, username, password)
            user_data = {
                'first_name': first_name,
                'last_name': last_name,
                'username': username,
                'password': password,
                'email': email
            } 
            serializer = UserSerializer(data=user_data)
            if serializer.is_valid():
                user = serializer.save()
                
        # Create the Employee object with nested User creation using the serializer
        user = User.objects.get(first_name=first_name, last_name=last_name)

        employee_data = {
            'user': user.id,
            'first_name': first_name,  
            'last_name': last_name 
        } 
 
        print(employee_data)

        serializer = EmployeeSerializer(data=employee_data)
        if serializer.is_valid():
            employee = serializer.save()
            print(employee)
            return JsonResponse({'message': 'Employee created successfully!', 'employee': serializer.data})
        else:
            return JsonResponse(serializer.errors, status=400)
    else:
        return JsonResponse({'message': 'post request made to create employee!!'})
    



def get_all_tasks_for_this_user(request, username):
    user = User.objects.get(username=username)
    print(user.id)
    emp_associated_with_this_user = Employee.objects.get(user=user.id)
    print(emp_associated_with_this_user.id)
    tasks_assigned_to_emp = Task.objects.filter(employee=emp_associated_with_this_user.id) 
    print(tasks_assigned_to_emp)
    # <QuerySet [<Task: The task is assgined to  = Deepak Singh and taskName = This is assigned to Deepak!!>]>
    task_serializer = TaskSerializer(tasks_assigned_to_emp, many=True)
    return JsonResponse({'tasks': task_serializer.data})