load("@npm//:defs.bzl", "npm_link_all_packages")
load("@rules_angular//src/architect:ng_application.bzl", "ng_application")
load("@rules_angular//src/architect:ng_config.bzl", "ng_config")
load("//:defs.bzl", "ng_app")

npm_link_all_packages(name = "node_modules")

ng_config(
    name = "ng-config",
    visibility = ["//angular:__subpackages__"],
)

TEST_EXCLUDES = [
    "**/*.spec.ts",
    "**/test-setup.ts",
]

ng_app(
    name = "myapp",
    srcs = glob(
        [
            "*.json",
            "src/**/*",
        ],
        exclude = TEST_EXCLUDES + glob([
            "**/node_modules/**/*",
        ]),
    ),
    out_dirs = ["dist"],
    test_srcs = glob(TEST_EXCLUDES),
    deps = [":node_modules"],
)

# A variant of myapp that uses rules_angular instead of architect_cli.
# ng_application expects tsconfig.app.json to be present, and so a superficial
# wrapper has been added to satisfy the rule.
ng_application(
    name = "myapp-ra",
    project_name = "myapp",
    node_modules = ":node_modules",
    ng_config = ":ng-config",
)
