from flask import Flask, request, jsonify, make_response
from NOR_CG import main_run
# import NOR_CG
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!!'

@app.route('/api/hot_pizza/<id>/<gender>', methods=['GET'])
def MakePizza(id, gender):
    result = "pizza call received " + id
    # a = jsonify(hello = result)
    # print(a)
    # print(result)
    # return make_response(jsonify(hello = result))
    print(main_run("men", "GM0020010624685"))
    return(jsonify(main_run("men", "GM0020010624685")))
    # return jsonify(Id = id,
    #                Sex = gender)

@app.errorhandler(500)
def internal_error(error):  
    return error

if __name__ == '__main__':
    app.run(host='127.0.0.1',port='1999', debug=True)