#!/usr/bin/env groovy

pipeline {
    agent {label 'hongkong'}
    stages {
        stage('Prepare') {
            steps {
                script {
                    PROJECT_NAME = 'vision-challenge'
                    DEPLOY_GROUP_TEST = 'precise1'
                    DEPLOY_GROUP_1 = 'vision-prod1'
                    DEPLOY_GROUP_2 = 'vision-prod2'
                }
                echo 'Building ' + PROJECT_NAME + ' ...'
                sh 'yarn run rb'
                sh 'rm node_modules/yotta-vue-components/.git'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing ...'
                // sh 'sonar-scanner'
            }
        }
        stage('Package') {
            when {
                branch 'master'
            }
            steps {
                echo 'Package to ' + DEPLOY_GROUP_TEST
                  // sh 'scp -r devops/nginx.conf vision@' + DEPLOY_GROUP_TEST + ':/opt/vision-challenge/nginx.conf'
                // sh 'mkdir -p /opt/vision-challenge/html/'
                  // sh 'scp -r dist/* vision@' + DEPLOY_GROUP_TEST + ':/opt/vision-challenge/html/'
                // sh 'sudo systemctl reload nginx.service'
                  // sh 'ssh vision@' + DEPLOY_GROUP_TEST + ' "sudo systemctl reload nginx.service"'
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                echo 'Deploying to ' + DEPLOY_GROUP_1
                sh 'scp -r devops/nginx-prod.conf vision@' + DEPLOY_GROUP_1 + ':/opt/vision-challenge/nginx.conf'
                // sh 'mkdir -p /opt/vision-challenge/html/'
                sh 'scp -r dist/* vision@' + DEPLOY_GROUP_1 + ':/opt/vision-challenge/html/'
                // sh 'sudo systemctl reload nginx.service'
                sh 'ssh vision@' + DEPLOY_GROUP_1 + ' "sudo systemctl reload nginx.service"'

                echo 'Deploying to ' + DEPLOY_GROUP_2
                sh 'scp -r devops/nginx-prod.conf vision@' + DEPLOY_GROUP_2 + ':/opt/vision-challenge/nginx.conf'
                // sh 'mkdir -p /opt/vision-challenge/html/'
                sh 'scp -r dist/* vision@' + DEPLOY_GROUP_2 + ':/opt/vision-challenge/html/'
                // sh 'sudo systemctl reload nginx.service'
                sh 'ssh vision@' + DEPLOY_GROUP_2 + ' "sudo systemctl reload nginx.service"'
            }
        }
    }
}
