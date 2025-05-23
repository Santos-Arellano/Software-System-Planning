# Kafka Local Cluster with Docker Compose
#video link: ink: https://youtu.be/O-CvfW9n2SA

Welcome to the **Kafka Local Cluster** project! This repository provides a Docker Compose configuration to set up a local Apache Kafka environment, including Zookeeper, a Kafka broker, and Kafka UI for easy cluster management. Whether you're developing, testing, or learning about Kafka, this setup offers a quick and reliable way to get started.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Video Tutorial](#video-tutorial)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This project uses Docker Compose to orchestrate three services:
- **Zookeeper**: Manages Kafka's metadata and coordination.
- **Kafka**: The core Kafka broker for message streaming.
- **Kafka UI**: A web-based interface to monitor and manage Kafka clusters, topics, and messages.

The setup is optimized for local development, with proper networking configured to ensure seamless communication between containers.

## Features
- **Single-node Kafka cluster** for development and testing.
- **Kafka UI** for visualizing topics, consumers, and messages.
- **Automatic topic creation** enabled for ease of use.
- **Docker Compose** for simplified setup and teardown.
- **Exposed ports** for external access to Kafka (9092) and Kafka UI (8080).

## Prerequisites
Ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or later)
- A machine with at least 4GB of RAM to run the containers smoothly.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Verify Docker Compose File**:
   Ensure the `docker-compose.yml` file is present in the project root. It defines the Zookeeper, Kafka, and Kafka UI services. You can find the configuration [here](docker-compose.yml).

3. **Start the Services**:
   Run the following command to start all services in detached mode:
   ```bash
   docker-compose up -d
   ```
   This pulls the required images (`confluentinc/cp-zookeeper`, `confluentinc/cp-kafka`, `provectuslabs/kafka-ui`) and starts the containers.

4. **Verify Containers**:
   Check that all containers are running:
   ```bash
   docker ps
   ```
   You should see three containers: `zookeeper`, `kafka`, and `kafka-ui`.

## Usage
- **Access Kafka UI**:
  Open your browser and navigate to `http://localhost:8080`. This opens the Kafka UI dashboard, where you can:
  - View and create topics.
  - Monitor consumer groups.
  - Inspect message payloads.
  - Manage cluster configurations.

- **Connect to Kafka**:
  Use the Kafka broker at `localhost:9092` for producing and consuming messages. Example tools:
  - **Kafka CLI**: Use `kafkacat` or Confluent’s `kafka-console-producer/consumer`.
  - **Programmatic Access**: Use Kafka clients in languages like Java, Python (`confluent-kafka`), or Node.js (`kafkajs`).

- **Example: Create a Topic via Kafka UI**:
  1. In Kafka UI, go to the "Topics" tab.
  2. Click "Create Topic," enter a name (e.g., `test-topic`), and set partitions/replication factor.
  3. Save to create the topic.

- **Stop the Services**:
  To stop and remove the containers:
  ```bash
   docker-compose down
   ```

## Video Tutorial
For a step-by-step guide on setting up and using this Kafka cluster, check out this excellent video tutorial:  
[Setup Kafka with Docker Compose](https://youtu.be/O-CvfW9n2SA)

## Troubleshooting
- **Kafka UI Cannot Connect to Broker**:
  - Ensure the Kafka container is running (`docker logs kafka`).
  - Verify `KAFKA_ADVERTISED_LISTENERS` in `docker-compose.yml` is set to `PLAINTEXT://kafka:9092`.
  - Check for port conflicts on `9092` or `8080`.

- **Zookeeper Errors**:
  - Inspect Zookeeper logs (`docker logs zookeeper`) for connection issues.
  - Ensure port `2181` is not blocked.

- **General Issues**:
  - Pull the latest images: `docker-compose pull`.
  - Restart services: `docker-compose down && docker-compose up -d`.
  - Check Docker network connectivity:
    ```bash
    docker exec -it kafka-ui ping kafka
    ```

For persistent issues, consult the [Kafka documentation](https://kafka.apache.org/documentation/) or open an issue in this repository.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please include tests and update documentation as needed.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
Happy streaming with Kafka! 🚀