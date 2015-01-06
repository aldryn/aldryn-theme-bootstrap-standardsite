Encoding.default_external = 'utf-8'

# Set this to the root of your project when deployed:
http_path = "" # use if other than /
css_dir = "aldryn_theme_bootstrap_standardsite/static/css"
sass_dir = "aldryn_theme_bootstrap_standardsite/private/sass"
images_dir = "aldryn_theme_bootstrap_standardsite/static/img"
javascripts_dir = "aldryn_theme_bootstrap_standardsite/static/js"
fonts_dir = "aldryn_theme_bootstrap_standardsite/static/fonts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

sass_options = {:sourcemap => true}

# Require any additional compass plugins here.
require 'bootstrap-sass'
