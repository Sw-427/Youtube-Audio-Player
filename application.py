from flask import Flask
from flask import render_template, jsonify, request, redirect, url_for, send_file, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from pathlib import Path

import os


from Yt_P import get_media, zipping, yt_cal

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


finaldata=[]
temp=[]
k = [0]

@app.route('/',methods=["GET", "POST"])
def a():
    if request.method == "POST":
        data = yt_cal(request.form.get("in"))
        finaldata.append(data)
        return redirect("/medi")
    else:
        finaldata.clear()
        return render_template("index.html")

@app.route('/medi',methods=["GET", "POST"])
def d():
    if request.method == "POST":
        if request.form.get("in2"):
            data = yt_cal(request.form.get("in2"))
            finaldata[0] = data
            return render_template("medi.html", data = data)
        elif request.form.get("fname"):
            temp.clear()
            temp.append(request.form.get("fname"))
            k[0] = 0
            return redirect('/play')
    else:
        return render_template("medi.html", data = finaldata[0])

@app.route('/play',methods=["GET","POST"])
def e():
    if request.method == "POST":
        if request.form['name']=="1":
            attempted_url = request.form["url"]
            if attempted_url != "":
                result_id = get_media(attempted_url)
                session["url"] = attempted_url
                session["id"] = result_id
                filename = request.form["title"]
                session["filename"] = filename
                # return render_template('material-life.html', title = "Success {}".format(title))
                # return render_template('material-life.html', title = result_id)
                return jsonify(data = filename)
        else:
            data = yt_cal(request.form['name'])
            return jsonify(data = data)
    elif len(temp)==1 and k[0] == 0:
        k[0] = 1
        for data in finaldata[0]:
            if data['id'] == int(temp[0]):
                temp2 = data
                return render_template("play.html",data = temp2)

@app.route("/download/")
def return_file():
    if True:
        filename = session.get("filename")
        filename_formatted = filename + ".mp3"
        #location = Path("media/Audio downloads/{}.mp3".format(session.get("id")))
        #a = format(session.get("id"))
        #location = "C:/Users/91704/OneDrive/Documents/Project/media/Audio downloads/{}.mp3".format(session.get("id"))
        location = "media/Audio downloads/{}.mp3".format(session.get("id"))
        print(filename_formatted)
        return send_file(
            location, attachment_filename=filename_formatted, as_attachment=True
        )

"""def errorhandler(e):
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)"""


if __name__ == '__main__':
    app.run(debug=True)
