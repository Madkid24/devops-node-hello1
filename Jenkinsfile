pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'echo Running tests (none for now)'
            }
        }
        stage('Build Docker') {
            steps {
                bat 'docker build -t hello-node .'
            }
        }
        stage('Run Docker') {
            steps {
                bat 'docker run -d -p 3000:3000 hello-node'
            }
        }
    }
}
