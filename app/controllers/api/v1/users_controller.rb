class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  # protect_from_forgery unless: -> { request.format.json? }

  def index
    if Rails.env == 'test'
      @current_user = User.first
    else
      @current_user = current_user
    end

    @avatar =
      if @current_user.avatar.present?
        @current_user.avatar.url
      else
        "https://lh4.googleusercontent.com/gFGu016l08MtNazJXCLRTjuNjwnSTuKDaodtDyGoGm_ImAzIaZD1hichsWIF042LxareGSAfsYI12w6Gw7377KVhI6B5XJRl739FnpIh8Yz7knFMQgweFMjGQScdD5ska-nXOfvu"
      end

      # display 1) the events the user created --> @events_by_user
    @events_by_user = Event.where(user_id: @current_user.id)

      # display 2) the events the user was invited to --> events_invited_to
    event_ids = Invite.where(email: @current_user.email).pluck(:event_id).uniq
    events_invited_to = Event.where(id: event_ids)

    @events = @events_by_user + events_invited_to
    render json: {
      current_user: @current_user,
      events: @events,
      events_by_user: @events_by_user,
      avatar: @avatar
    }
  end
end
