load("@npm//:@angular-devkit/architect-cli/package_json.bzl", architect_cli = "bin")

# Common dependencies of Angular packages
PACKAGE_DEPS = [
    "//:node_modules/@angular/common",
    "//:node_modules/@angular/core",
    "//:node_modules/@angular/forms",
    "//:node_modules/@angular/material",
    "//:node_modules/@angular/router",
    "//:node_modules/@types/node",
    "//:node_modules/rxjs",
    "//:node_modules/tslib",
    "//:node_modules/@angular-devkit/build-angular",
    "//:node_modules/@angular-devkit/architect-cli",
    "//:node_modules/tslib",
    "//:node_modules/rxjs",
]

def ng_app(
        name,
        srcs,
        out_dirs,
        project_name = None,
        deps = [],
        test_srcs = [],
        test_deps = [],
        test_size = "medium",
        test_tags = [],
        **kwargs):
    """
    Bazel macro for compiling an NG application project.

    Creates {name}, {name}-dev-server, and (if test_srcs are provided) {name}-test targets.

    Args:
      name: the rule name
      srcs: The sources for the application.
      out_dirs: The directories to be treated as output from the build target; this should match the
        outputPath from the angular.json project
      project_name: the Angular CLI project name; defaults to the rule name
      deps: dependencies of the application
      test_srcs: additional sources needed for a test target
      test_deps: additional dependencies needed for a test target
      test_size: the size to be applied to a test target
      test_tags: tags to be applied to a test target
      **kwargs: extra args passed to main Angular CLI rules
    """
    project_name = project_name if project_name else name

    architect_cli.architect(
        name = name,
        chdir = native.package_name(),
        args = ["%s:build" % project_name],
        out_dirs = out_dirs,
        srcs = srcs + deps + PACKAGE_DEPS,
        **kwargs
    )

    architect_cli.architect_binary(
        name = name + "-dev-server",
        chdir = native.package_name(),
        args = ["%s:serve" % project_name],
        data = srcs + deps + PACKAGE_DEPS,
        **kwargs
    )

    if len(test_srcs):
        architect_cli.architect_test(
            name = name + "-test",
            chdir = native.package_name(),
            args = ["%s:test" % project_name],
            data = srcs + test_srcs + deps + test_deps + PACKAGE_DEPS,
            log_level = "debug",
            size = test_size,
            tags = test_tags,
            **kwargs
        )
