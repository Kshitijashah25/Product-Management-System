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
                sh 'docker build -t budcoded/productmanagementsystem:latest .'
                sh 'docker build -t budcoded/productmanagementsystemui:latest ./frontend'
            }
        }
        stage ('Push Docker Image') {
            steps {
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
//         stage ('Copy Log File') {
//             steps {
//                 sh 'docker start AjayCalc'
//                 sh 'echo 14plmn75 | sudo -S docker cp AjayCalc:application.log /home/budcoded/Desktop'
//             }
//         }
        // stage ('Docker Container Delete') {
        //     steps {
        //         sh 'docker stop AjayCalc || true'
        //         sh 'docker rm AjayCalc || true'
        //     }
        // }
        // stage ('Deploy and Run Image') {
        //     steps {
        //         sh 'ansible-playbook -i inventory playbook.yml'
        //     }
        // }
    }
}