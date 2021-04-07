from flask import Flask
import pandas as pd
import pickle
import json
import sys

from flask import jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def hello_world():
    return 'Second try'

@app.route('/random_forest', methods=['GET'])
def new_api():
    # Get the user input
    parser = reqparse.RequestParser()

    list_args = ['annual_inc', 'last_fico_range_low', 'last_fico_range_high',
       'collections_12_mths_ex_med', 'delinq_2yrs', 'loan_amnt',
       'open_acc', 'pub_rec', 'revol_bal', 'emp_length_10+ years',
       'emp_length_2 years', 'emp_length_3 years', 'emp_length_4 years',
       'emp_length_5 years', 'emp_length_6 years', 'emp_length_7 years',
       'emp_length_8 years', 'emp_length_9 years', 'emp_length__ 1 year',
       'home_ownership_MORTGAGE', 'home_ownership_NONE',
       'home_ownership_OTHER', 'home_ownership_OWN',
       'home_ownership_RENT', 'purpose_credit_card',
       'purpose_debt_consolidation', 'purpose_educational',
       'purpose_home_improvement', 'purpose_house',
       'purpose_major_purchase', 'purpose_medical', 'purpose_moving',
       'purpose_other', 'purpose_renewable_energy',
       'purpose_small_business', 'purpose_vacation', 'purpose_wedding',
       'grade_B', 'grade_C', 'grade_D', 'grade_E', 'grade_F', 'grade_G']

    for a in list_args:
        parser.add_argument(a)

    args = parser.parse_args()

    #Unpack the model and scaler files
    loaded_model = pickle.load(open('../finalized_model_fico.model','rb'))
    loaded_scaler = pickle.load(open('../scaler.scl','rb'))

    cols_when_model_builds = loaded_model.get_booster().feature_names

    df_dict = {}
    for c in cols_when_model_builds:
        if c == 'emp_length_10+ years':
            df_dict[c] = [0]
        else:
            df_dict[c] = [int(args[c])]


    df_new = pd.DataFrame(df_dict)
    X_test_scaled_new = pd.DataFrame(loaded_scaler.transform(df_new))

    predicted = loaded_model.predict(df_new[cols_when_model_builds].iloc[[-1]])

    output= {}

    output["Predicted class "]=int(predicted[0])
    return jsonify(output)


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)