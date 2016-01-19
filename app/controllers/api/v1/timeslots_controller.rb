class Api::V1::TimeslotsController < ApplicationController
  respond_to :json

  def create
    respond_with :api, :v1, Timeslot.create(timeslot_params)
  end

  def destroy
    respond_with :api, :v1, Timeslot.destroy(params[:id])
  end

  def show
    respond_with :api, :vi, Timeslot.find(params[:id])
  end

  private

  def timeslot_params
    params.require(:timeslot).permit(:date, :start_time, :end_time, :user_id, :schedule_id)
  end

end
