from django.urls import path
from . import views

urlpatterns = [
    path('', views.task_list, name='task-list'), # http://localhost:8000/tasks/
    path('<int:pk>/', views.task_detail, name='task-detail'), # http://localhost:8000/tasks/1/
    path('update/<int:pk>/', views.task_update),
    path('create/', views.task_create),
    path('employees/', views.get_employees),
    path('delete/<int:pk>/', views.task_delete),
    path('register/', views.UserRegistrationView.as_view(), name='user-registration'),
    path('login/', views.UserLoginView.as_view(), name='user-login'),
    path('checkSuperUser/<str:username>', views.check_superuser, name='check-super-user'),
    path('createEmployee/', views.create_employee, name='create-employee'),   
    path('user/<str:username>/', views.get_all_tasks_for_this_user),
    path('updateRegularUser/<int:pk>/', views.task_update_for_regular_user),
    path('analytics/', views.analytics)
]