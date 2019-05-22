workflow "Run tests on pull requests" {
  resolves = ["Test"]
  on = "pull_request"
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "install"
}

action "Test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "test"
  needs = ["Install"]
}
