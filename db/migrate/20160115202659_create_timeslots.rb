class CreateTimeslots < ActiveRecord::Migration
  def change
    create_table :timeslots do |t|
      t.date :date
      t.time :start_time
      t.time :end_time
      t.text :notes
      t.references :schedule, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
