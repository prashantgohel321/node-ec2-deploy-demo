pipeline{
    agent any
    
    stages{
        stage("**** Clone ****"){
            steps{
                checkout scm
            }
        }
        stage("**** Build Docker image ****"){
            steps{
                sh 'docker build -t my-web-app:latest .'
            }
        }

        stage("**** Login to dockerhub ****"){
            steps{
                withCredentials([usernamePassword(credentialsId: "dockerhub", usernameVariable: "DOCKER_USER", passwordVariable: "DOCKER_PASS")]){
                    sh 'echo "$DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('**** Push ****'){
            steps{
                sh 'docker tag my-web-app:latest $DOCKER_USER/my-web-app:latest'
                sh 'docker push $DOCKER_USER/my-web-app:latest'
            }
        }

        stage('**** Deploy to EC2 ****'){
            steps{
                sshagent(['ec2-ssh-key']){
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@ip-172-31-25-17 '
                        docker pull $DOCKER_USER/my-web-app:latest &&
                        docker stop app || true &&
                        docker rm app || true &&
                        docker run -d --name app -p 3030:3000 $DOCKER_USER/my-web-app:latest
                    '
                    """
                }
            }
        }
    }
    
    
}