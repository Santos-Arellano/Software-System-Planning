# Microservices Application Deployment on Kubernetes

## Overview

This project deploys a microservices-based application that solves the equation `f(a,b,c,d) = (a+b) × (c-d)` using four microservices (`suma`, `resta`, `ecuacion`, `almacenar`) and a MySQL database. The application, originally designed for Docker Compose, is now deployed on a Kubernetes cluster, utilizing Kubernetes resources such as Namespaces, ConfigMaps, PersistentVolumes, Deployments, Services, and Ingress. The deployment ensures proper networking, service communication, and persistent storage for MySQL.

The microservices are:
- **suma**: Calculates `a + b`.
- **resta**: Calculates `c - d`.
- **ecuacion**: Calls `suma` and `resta`, multiplies their results, and stores the data in MySQL.
- **almacenar**: Provides an endpoint to store results in MySQL.
- **mysql**: Stores results persistently in a database named `resultados_db`.

This README provides instructions to set up, deploy, test, and troubleshoot the application on a Kubernetes cluster using Minikube.

## Prerequisites

- **Docker**: To build and push microservice images.
- **Docker Hub Account**: To store Docker images.
- **Minikube**: For running a local Kubernetes cluster.
- **kubectl**: CLI for Kubernetes interaction.
- **Postman**: For testing API endpoints.
- **MySQL Client**: Optional, for direct database access.
- **Text Editor**: To edit manifests and configuration files.

## Project Structure

```
ecuacion-microservicios-kubernetes/
├── README.md
├── report.pdf
├── k8s-manifests/
│   ├── namespace.yaml
│   ├── mysql-config.yaml
│   ├── mysql-init.yaml
│   ├── mysql-pv.yaml
│   ├── mysql-deployment.yaml
│   ├── suma.yaml
│   ├── resta.yaml
│   ├── ecuacion.yaml
│   ├── almacenar.yaml
│   ├── ingress.yaml
├── suma/
│   ├── suma.py
│   ├── Dockerfile
├── resta/
│   ├── resta.py
│   ├── Dockerfile
├── ecuacion/
│   ├── multiplica.py
│   ├── Dockerfile
├── almacenar/
│   ├── almacenar.py
│   ├── Dockerfile
├── mysql/
│   ├── init.sql
├── compose.yaml
```

## Setup Instructions

1. **Clone the Repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd ecuacion-microservicios-kubernetes
   ```

2. **Install Dependencies**:
   - Install Docker: Follow instructions at [docker.com](https://www.docker.com/get-started).
   - Install Minikube: Follow [Minikube documentation](https://minikube.sigs.k8s.io/docs/start/).
   - Install kubectl: Follow [Kubernetes documentation](https://kubernetes.io/docs/tasks/tools/).
   - Install Postman: Download from [postman.com](https://www.postman.com/downloads/).

3. **Start Minikube**:
   ```bash
   minikube start
   ```

4. **Build and Push Docker Images**:
   - Navigate to each microservice directory (`suma`, `resta`, `ecuacion`, `almacenar`).
   - Build and push images to Docker Hub (replace `<your-username>` with your Docker Hub username):
     ```bash
     docker build -t <your-username>/suma:latest ./suma
     docker build -t <your-username>/resta:latest ./resta
     docker build -t <your-username>/ecuacion:latest ./ecuacion
     docker build -t <your-username>/almacenar:latest ./almacenar
     docker push <your-username>/suma:latest
     docker push <your-username>/resta:latest
     docker push <your-username>/ecuacion:latest
     docker push <your-username>/almacenar:latest
     ```

5. **Update Kubernetes Manifests**:
   - Edit the manifests in `k8s-manifests/` (`suma.yaml`, `resta.yaml`, `ecuacion.yaml`, `almacenar.yaml`).
   - Replace `<tu-usuario>` with your Docker Hub username in the `image` fields.

## Deployment Instructions

1. **Enable Ingress Controller**:
   ```bash
   minikube addons enable ingress
   ```

2. **Apply Kubernetes Manifests**:
   Navigate to the `k8s-manifests/` directory and apply the manifests in order:
   ```bash
   kubectl apply -f namespace.yaml
   kubectl apply -f mysql-config.yaml
   kubectl apply -f mysql-init.yaml
   kubectl apply -f mysql-pv.yaml
   kubectl apply -f mysql-deployment.yaml
   kubectl apply -f suma.yaml
   kubectl apply -f resta.yaml
   kubectl apply -f ecuacion.yaml
   kubectl apply -f almacenar.yaml
   kubectl apply -f ingress.yaml
   ```

3. **Verify Deployment**:
   - Check pod status:
     ```bash
     kubectl get pods -n microservicios
     ```
   - Check service status:
     ```bash
     kubectl get svc -n microservicios
     ```

4. **Configure Local DNS**:
   - Get Minikube IP:
     ```bash
     minikube ip
     ```
   - Add to `/etc/hosts` (or equivalent on Windows):
     ```
     <minikube-ip> ecuacion.local
     ```

## Testing Instructions

1. **Test the `ecuacion` Microservice**:
   - Use Postman to send a POST request to `http://ecuacion.local/resolver` with the following JSON body:
     ```json
     {
         "a": 5,
         "b": 7,
         "c": 3,
         "d": 8
     }
     ```
   - Expected response: `{"resultado": -60.0}` (since `(5+7) × (3-8) = 12 × -5 = -60`).

2. **Test the `historial` Endpoint**:
   - Send a GET request to `http://ecuacion.local/historial`.
   - Verify the response contains stored results in JSON format.

3. **Test Individual Microservices**:
   - For `suma`, send a POST request to `http://<minikube-ip>:8001/sumar`:
     ```json
     {
         "a": 15,
         "b": 17
     }
     ```
     Expected response: `{"resultado": 32}`.
   - Repeat for `resta` at `http://<minikube-ip>:8002/restar`.

4. **Verify Data Persistence**:
   - Access the MySQL pod:
     ```bash
     kubectl exec -it $(kubectl get pods -n microservicios -l app=mysql -o jsonpath="{.items[0].metadata.name}") -n microservicios -- mysql -u root -prootpassword123
     ```
   - Run SQL commands:
     ```sql
     SHOW DATABASES;
     USE resultados_db;
     SHOW TABLES;
     SELECT * FROM resultados;
     ```
   - Confirm data (e.g., `a=5, b=7, c=3, d=8, resultado=-60`).
   - Test persistence by deleting the MySQL pod:
     ```bash
     kubectl delete pod -l app=mysql -n microservicios
     ```
     Re-run the SQL queries after the pod restarts to confirm data remains.

## Troubleshooting

- **Issue: `init.sql` not executing**:
  - Check MySQL pod logs:
    ```bash
    kubectl logs <mysql-pod-name> -n microservicios
    ```
  - If the database or table is missing, manually create them:
    ```sql
    CREATE DATABASE IF NOT EXISTS resultados_db;
    USE resultados_db;
    CREATE TABLE IF NOT EXISTS resultados (
        id INT AUTO_INCREMENT PRIMARY KEY,
        a FLOAT NOT NULL,
        b FLOAT NOT NULL,
        c FLOAT NOT NULL,
        d FLOAT NOT NULL,
        resultado FLOAT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

- **Issue: Service communication failure**:
  - Ensure services are resolvable via DNS (`mysql`, `suma`, `resta`, `ecuacion`, `almacenar`).
  - Check pod status: `kubectl describe pod <pod-name> -n microservicios`.

- **Issue: Ingress not working**:
  - Verify the Ingress controller is running: `kubectl get pods -n ingress-nginx`.
  - Ensure `/etc/hosts` is correctly configured with `ecuacion.local`.

## Cleanup

To remove all resources:
```bash
kubectl delete -f k8s-manifests/ingress.yaml
kubectl delete -f k8s-manifests/almacenar.yaml
kubectl delete -f k8s-manifests/ecuacion.yaml
kubectl delete -f k8s-manifests/resta.yaml
kubectl delete -f k8s-manifests/suma.yaml
kubectl delete -f k8s-manifests/mysql-deployment.yaml
kubectl delete -f k8s-manifests/mysql-pv.yaml
kubectl delete -f k8s-manifests/mysql-init.yaml
kubectl delete -f k8s-manifests/mysql-config.yaml
kubectl delete namespace microservicios
```

## Notes

- Replace `<your-username>` in the manifests with your Docker Hub username.
- Ensure Minikube has sufficient resources (e.g., 4GB RAM, 2 CPUs).
- The `report.pdf` in the project root contains a detailed deployment report, as required for the assignment.

## License

This project is for educational purposes as part of a course at Instituto Tecnológico y de Estudios Superiores de Monterrey, Campus Guadalajara.