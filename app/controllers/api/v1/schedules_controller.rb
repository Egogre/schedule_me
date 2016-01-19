class Api::V1::SchedulesController < ApplicationController
  respond_to :json

  def create
    params["schedule"]["user_id"] = current_user.id
    respond_with :api, :v1, Schedule.create(schedule_params)
  end

  def index
    respond_with Schedule.where(user_id: current_user.id)
  end

  def destroy
    respond_with :api, :v1, Schedule.destroy(params[:id])
  end

  private

  def schedule_params
    params.require(:schedule).permit(:title, :start_date, :end_date, :user_id)
  end

end
