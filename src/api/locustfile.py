from locust import HttpUser, task, between  
import json  
import random  

class APIUser(HttpUser):  
    wait_time = between(1, 3)  # Wait time between requests  

    @task  
    def predict(self):  
        data = {  
            "Age_at_enrollment": random.randint(18, 40),  
            "Previous_qualification": random.randint(1, 5),  
            "Curricular_units_1st_sem_approved": random.randint(0, 10),  
            "Scholarship_holder": random.choice([0, 1]),  
            "Debtor": random.choice([0, 1]),  
            "Gender": random.choice([0, 1]),  
            "Course": random.randint(1, 10)  
        }  
        self.client.post("/predict", json=data)  

