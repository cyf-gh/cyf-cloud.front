. ./_DeployGithubPage.ps1
Copy-Item -Path .\mycli3\* -Recurse -Destination W:\.web\cyf-cloud.front\mycli3 -Force
. ./_DeployLocalD.ps1
