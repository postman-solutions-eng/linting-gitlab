# linting-gitlab

## GitLab CI/CD Variables

Within GitLab, you must configure the following CI/CD variables:

| Name | Description |
|---|---|
| `GITLAB_PAT` | A GitLab PAT with `read_repository` permission |
| `POSTMAN_API_BASE_URL` | With a value of `http://localhost:3000`. The port can be dropped if you also specify a `PORT` variable. |
| `POSTMAN_RULES` | A GitLab API link to your Postman linting rules e.g. `https://gitlab.example.com/api/v4/projects/59/repository/files/rules%2Ejson/raw?ref=main` where `59` is the project ID, and `rules.json` is the file's location. |

## GitLab Pipeline Config

```
image: node:latest

postman:
  before_script:
    - curl -o- "https://dl-cli.pstmn.io/install/linux64.sh" | sh
    - npx @postman-field-services/linting-gitlab &
  script:
    - postman collection run "${CI_PROJECT_DIR}/postman/collections/myCollection.json"
    - postman api lint "${CI_PROJECT_DIR}/postman/schemas/index.yaml"
  after_script:
    - killall node
```
