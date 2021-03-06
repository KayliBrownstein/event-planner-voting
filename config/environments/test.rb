Rails.application.configure do
  config.cache_classes = true

  config.eager_load = false

  config.serve_static_files   = true
  config.static_cache_control = 'public, max-age=3600'

  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  config.action_dispatch.show_exceptions = false

  config.action_controller.allow_forgery_protection = false
  config.action_mailer.perform_caching = false

  config.action_mailer.delivery_method = :test

  # config.active_support.test_order = :random

  config.active_support.deprecation = :stderr

  config.action_mailer.delivery_method = :sendmail
  config.action_mailer.sendmail_settings = {
    address: 'smtp.gmail.com',
    port: 587,
    domain: "http://localhost:3000",
    user_name: "seeyouwhen.herokuapp",
    password: "Password123pop",
    authentication: "plain",
    enable_starttls_auto: true
  }
end
