class CreateEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :entries do |t|
      t.string :name
      t.text :description
      t.datetime :created_at
      t.integer :amount
      t.references :company, foreign_key: true

      t.timestamps
    end
  end
end
