pipeline {
    agent any
    stages {
        stage ('Git Pull') {
            steps {
                git url: 'https://github.com/Kshitijashah25/Product-Management-System.git',
                branch: 'master'
            }
        }
        stage ('Maven Build') {
            steps {
                sh 'mvn clean install -DskipTests'
            }
        }
        stage ('Build Docker Image') {
            steps {
//                 sh 'docker build -t kshitijashah/productmanagementsystem:latest .'
//                 sh 'docker build -t kshitijashah/productmanagementsystemui:latest ./frontend'
                sh 'docker build -t budcoded/productmanagementsystem:latest .'
                sh 'docker build -t budcoded/productmanagementsystemui:latest ./frontend'
            }
        }
        stage ('Push Docker Image') {
            steps {
//                 sh 'docker login -u kshitijashah -p kshitija@9991'
//                 sh 'docker push kshitijashah/productmanagementsystem:latest'
//                 sh 'docker push kshitijashah/productmanagementsystemui:latest'
                sh 'docker login -u budcoded -p budcodedbudcoded'
                sh 'docker push budcoded/productmanagementsystem:latest'
                sh 'docker push budcoded/productmanagementsystemui:latest'
            }
        }
        stage ('Ansible Copy Docker-Compose File') {
            steps {
                sh 'ansible-playbook -i inventory playbook.yml'
            }
        }
    }
}