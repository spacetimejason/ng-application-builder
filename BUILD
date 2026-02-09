load("@npm//:defs.bzl", "npm_link_all_packages")
load("//:defs.bzl", "ng_app")

npm_link_all_packages(name = "node_modules")

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
