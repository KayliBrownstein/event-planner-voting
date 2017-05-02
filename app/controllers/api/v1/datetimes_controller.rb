class Api::V1::DatetimesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @event = Event.find(params[:event_id])
    @datetimes = @event.datetimes
    render json: @datetimes
    @user = current_user
  end

  def create
    @datetime = Datetime.new(datetime_params)
    @datetime.user_id = current_user.id
    @event = Event.find(params[:event_id])
    @datetime.event = @event
    if @datetime.save!
      render json: @datetime
    end
  end

  def edit
    @datetime = Datetime.find(params[:id])
  end

  def update
    @datetime = Datetime.find(params[:id])
    @datetime.update(datetime_params)
    if @datetime.save!
      render json: @datetime
    end
  end

  private

  def datetime_params
    params.permit(:id, :user_id, :event_id, :date, :time)
  end
end
