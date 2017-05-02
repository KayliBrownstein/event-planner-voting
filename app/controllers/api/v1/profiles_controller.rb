class Api::V1::ProfilesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @events = Event.where(user_id: current_user.id)
    @current_user = current_user
    render json: @current_user
  end
end
