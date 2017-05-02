class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  # protect_from_forgery unless: -> { request.format.json? }

  def index
    @current_user = current_user
    @events = Event.where(user_id: @current_user.id)
    render json: {current_user: @current_user, events: @events }
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
