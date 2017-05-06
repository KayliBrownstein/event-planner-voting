class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  # protect_from_forgery unless: -> { request.format.json? }

  def index
    @current_user = current_user
    @avatar = current_user.avatar.url
    # @admins = User.where(admin: true)
    events_by_user = Event.where(user_id: @current_user.id)

    event_ids = Invite.where(email: @current_user.email).pluck(:event_id).uniq
    events_invited_to = Event.where(id: event_ids)

    @events = events_by_user + events_invited_to
    render json: {current_user: @current_user, events: @events, avatar: @avatar }
  end

  def create
    @user = User.create(user_params)
    if @user.save!
      render json: @user
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    flash[:notice] = "Successfully deleted user!"
    redirect_to users_path
  end

private
  def make_admin
    user.update_attribute(:admin, true)
  end
end
