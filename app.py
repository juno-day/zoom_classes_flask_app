#Dependencies
from flask import Flask,render_template,session,redirect,url_for,jsonify,send_from_directory
from flask_socketio import SocketIO,emit,join_room,leave_room,send
import json

# App stuff
app = Flask(__name__)#,template_folder="./dist/app/templates"
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app,async_mode=None)

#Routers
@app.route("/",methods=["GET"])
def home():
    return render_template("index.html")

#Socket

@socketio.on("get_user_data")
def send_data(data):
    emit("user_data_back",{"data":get_user_data(data)})

#Functions
def get_user_data(data):
    with open("users.json","r") as f:
        users = json.load(f)
        if data["user"] not in users:
            users[data["user"]] = {}
            with open("users.json","w") as f:
                json.dump(users,f)
            return {}
        return users[data["users"]]
        

#Run
if __name__ == "__main__":
    socketio.run(app,host="0.0.0.0",port=5000,debug=True)
    #  app.run(host="0.0.0.0",port=5000)