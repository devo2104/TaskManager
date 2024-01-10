from django.contrib import admin
from django.urls import path,include, re_path
from tasks import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('tasks/', include('tasks.urls'), name='tasks') # http://localhost:8000/ notice we can put / 
] 
 