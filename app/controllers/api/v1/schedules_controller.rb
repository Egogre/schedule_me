class Api::V1::SchedulesController < ApplicationController
  respond_to :json

  def create
    params["schedule"]["user_id"] = current_user.id
    respond_with :api, :v1, Schedule.create(schedule_params)
  end

  def index
    schedules = Schedule.includes(:timeslots).where(user_id: current_user.id)
    payload = schedules.map do |schedule|
      {id: schedule.id, title: schedule.title, timeslots: schedule.timeslots}
    end
    respond_with payload
  end

  def destroy
    respond_with :api, :v1, Schedule.destroy(params[:id])
  end

  private

  def schedule_params
    params.require(:schedule).permit(:title, :start_date, :end_date, :user_id)
  end

end
