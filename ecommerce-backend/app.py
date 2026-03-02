# from flask import Flask, jsonify, request, send_from_directory
# from flask_cors import CORS
# from pymongo import MongoClient
# from bson.objectid import ObjectId
# from flask_bcrypt import Bcrypt
# from functools import wraps
# import jwt

# import datetime
# import os
# from dotenv import load_dotenv

# load_dotenv()

# app = Flask(__name__)
# CORS(app)

# # ========================= Config =========================
# app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "supersecretkey")
# bcrypt = Bcrypt(app)

# # ========================= MongoDB Setup =========================
# mongo_uri = os.getenv("MONGO_URI")
# client = MongoClient(mongo_uri)
# db = client['ecommerce']

# products_collection = db['products']
# users_collection = db['users']
# orders_collection = db['orders']

# # ========================= JWT Middleware =========================
# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         auth_header = request.headers.get("Authorization")
#         if not auth_header:
#             return jsonify({"error": "Token missing"}), 401
#         try:
#             token = auth_header.split(" ")[1]  # 🔥 remove "Bearer"
#             data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
#             current_user = users_collection.find_one({"_id": ObjectId(data['user_id'])})
#             if not current_user:
#                 return jsonify({"error": "User not found"}), 401
#         except Exception as e:
#             print("JWT ERROR:", e)
#             return jsonify({"error": "Invalid or expired token"}), 401
#         return f(current_user, *args, **kwargs)
#     return decorated
# # ========================= Static Images =========================
# @app.route('/images/<filename>')
# def get_image(filename):
#     return send_from_directory('data/images', filename)
# # ========================= Products API =========================
# @app.route('/products', methods=['POST'])
# @token_required
# def create_product(current_user):
#     if current_user.get("role") != "admin":
#         return jsonify({"error": "Access denied"}), 403

#     data = request.json
#     result = products_collection.insert_one(data)
#     return jsonify({"id": str(result.inserted_id)}), 201


# @app.route('/products', methods=['GET'])
# def get_products():
#     category = request.args.get("category")
#     search = request.args.get("search")   # 🔥 ADD THIS

#     query = {}

#     if category:
#         query["category"] = category

#     if search:
#         query["name"] = {"$regex": search, "$options": "i"}  # 🔥 CASE INSENSITIVE SEARCH

#     products = list(products_collection.find(query))
#     for product in products:
#         product['_id'] = str(product['_id'])

#     return jsonify(products)


# @app.route('/products/<id>', methods=['GET'])
# def get_product(id):
#     product = products_collection.find_one({"_id": ObjectId(id)})
#     if product:
#         product['_id'] = str(product['_id'])
#         return jsonify(product)
#     return jsonify({"error": "Product not found"}), 404


# @app.route('/products/<id>', methods=['PUT'])
# @token_required
# def update_product(current_user, id):
#     if current_user.get("role") != "admin":
#         return jsonify({"error": "Access denied"}), 403

#     data = request.json
#     result = products_collection.update_one(
#         {"_id": ObjectId(id)},
#         {"$set": data}
#     )

#     if result.matched_count:
#         return jsonify({"message": "Product updated"})
#     return jsonify({"error": "Product not found"}), 404


# @app.route('/products/<id>', methods=['DELETE'])
# @token_required
# def delete_product(current_user, id):
#     if current_user.get("role") != "admin":
#         return jsonify({"error": "Access denied"}), 403

#     result = products_collection.delete_one({"_id": ObjectId(id)})

#     if result.deleted_count:
#         return jsonify({"message": "Product deleted"})
#     return jsonify({"error": "Product not found"}), 404

# # ========================= Orders API =========================
# @app.route('/orders', methods=['POST'])
# @token_required
# def create_order(current_user):
#     data = request.json
#     order = {
#         "user_id": str(current_user["_id"]),
#         "name": data.get("name"),
#         "email": data.get("email"),
#         "address": data.get("address"),
#         "phone": data.get("phone"),
#         "payment": data.get("payment"),
#         "items": data.get("items"),
#         "total": data.get("total"),
#         "created_at": datetime.datetime.utcnow(),
#         "status": "Pending"
#     }
#     result = orders_collection.insert_one(order)
#     return jsonify({"message": "Order placed successfully", "id": str(result.inserted_id)}), 201



# # ========================= Register =========================

# @app.route('/register', methods=['POST'])
# def register_user():
#     data = request.json
#     username = data.get("username")
#     password = data.get("password")

#     if not username or not password:
#         return jsonify({"error": "Username and password required"}), 400

#     if users_collection.find_one({"username": username}):
#         return jsonify({"error": "User already exists"}), 400

#     hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

#     user = {
#         "username": username,
#         "password": hashed_password,
#         "role": "user"
#     }

#     result = users_collection.insert_one(user)

#     return jsonify({"message": "User registered successfully"})

# # ========================= Login =========================
# @app.route('/login', methods=['POST'])
# def login_user():
#     data = request.json
#     username = data.get("username")
#     password = data.get("password")

#     user = users_collection.find_one({"username": username})
#     if not user:
#         return jsonify({"error": "User not found"}), 401

#     # Compare password
#     if bcrypt.check_password_hash(user['password'], password):
#         token = jwt.encode({
#             "user_id": str(user['_id']),
#             "role": user.get("role", "user"),   # role detect karta hai
#             "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
#         }, app.config['SECRET_KEY'], algorithm="HS256")

#         return jsonify({
#             "message": "Login successful",
#             "token": token,
#             "role": user.get("role", "user")
#         })

#     return jsonify({"error": "Invalid credentials"}), 401

# # ========================= Admin Panel =========================
# @app.route('/admin', methods=['GET'])
# @token_required
# def admin_panel(current_user):

#     if current_user.get("role") != "admin":
#         return jsonify({"error": "Access denied"}), 403

#     return jsonify({"message": "Welcome Admin"})

# # ========================= Main =========================
# if __name__ == '__main__':
#     app.run(debug=True)























from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_bcrypt import Bcrypt
from functools import wraps
import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# ========================= App Setup =========================
app = Flask(__name__, static_folder="build")  # ✅ build folder serve karne ke liye
CORS(app)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "supersecretkey")
bcrypt = Bcrypt(app)

# ========================= MongoDB Setup =========================
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client['ecommerce']

products_collection = db['products']
users_collection = db['users']
orders_collection = db['orders']

# ========================= JWT Middleware =========================
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Token missing"}), 401
        try:
            token = auth_header.split(" ")[1]
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = users_collection.find_one({"_id": ObjectId(data['user_id'])})
            if not current_user:
                return jsonify({"error": "User not found"}), 401
        except Exception as e:
            print("JWT ERROR:", e)
            return jsonify({"error": "Invalid or expired token"}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# ========================= Static Images =========================
@app.route('/images/<filename>')
def get_image(filename):
    return send_from_directory('data/images', filename)

# ========================= Products API =========================
@app.route('/products', methods=['POST'])
@token_required
def create_product(current_user):
    if current_user.get("role") != "admin":
        return jsonify({"error": "Access denied"}), 403

    data = request.json
    result = products_collection.insert_one(data)
    return jsonify({"id": str(result.inserted_id)}), 201

@app.route('/products', methods=['GET'])
def get_products():
    category = request.args.get("category")
    search = request.args.get("search")
    query = {}
    if category:
        query["category"] = category
    if search:
        query["name"] = {"$regex": search, "$options": "i"}
    products = list(products_collection.find(query))
    for product in products:
        product['_id'] = str(product['_id'])
    return jsonify(products)

@app.route('/products/<id>', methods=['GET'])
def get_product(id):
    product = products_collection.find_one({"_id": ObjectId(id)})
    if product:
        product['_id'] = str(product['_id'])
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

@app.route('/products/<id>', methods=['PUT'])
@token_required
def update_product(current_user, id):
    if current_user.get("role") != "admin":
        return jsonify({"error": "Access denied"}), 403
    data = request.json
    result = products_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    if result.matched_count:
        return jsonify({"message": "Product updated"})
    return jsonify({"error": "Product not found"}), 404

@app.route('/products/<id>', methods=['DELETE'])
@token_required
def delete_product(current_user, id):
    if current_user.get("role") != "admin":
        return jsonify({"error": "Access denied"}), 403
    result = products_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count:
        return jsonify({"message": "Product deleted"})
    return jsonify({"error": "Product not found"}), 404

# ========================= Orders API =========================
@app.route('/orders', methods=['POST'])
@token_required
def create_order(current_user):
    data = request.json
    order = {
        "user_id": str(current_user["_id"]),
        "name": data.get("name"),
        "email": data.get("email"),
        "address": data.get("address"),
        "phone": data.get("phone"),
        "payment": data.get("payment"),
        "items": data.get("items"),
        "total": data.get("total"),
        "created_at": datetime.datetime.utcnow(),
        "status": "Pending"
    }
    result = orders_collection.insert_one(order)
    return jsonify({"message": "Order placed successfully", "id": str(result.inserted_id)}), 201

# ========================= Register & Login =========================
@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400
    if users_collection.find_one({"username": username}):
        return jsonify({"error": "User already exists"}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = {"username": username, "password": hashed_password, "role": "user"}
    result = users_collection.insert_one(user)
    return jsonify({"message": "User registered successfully"})

@app.route('/login', methods=['POST'])
def login_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    user = users_collection.find_one({"username": username})
    if not user:
        return jsonify({"error": "User not found"}), 401
    if bcrypt.check_password_hash(user['password'], password):
        token = jwt.encode({
            "user_id": str(user['_id']),
            "role": user.get("role", "user"),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({"message": "Login successful", "token": token, "role": user.get("role", "user")})
    return jsonify({"error": "Invalid credentials"}), 401

# ========================= Admin Panel =========================
@app.route('/admin', methods=['GET'])
@token_required
def admin_panel(current_user):
    if current_user.get("role") != "admin":
        return jsonify({"error": "Access denied"}), 403
    return jsonify({"message": "Welcome Admin"})

# ========================= React Frontend Serve =========================
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# ========================= Main =========================
if __name__ == '__main__':
    app.run(debug=True)