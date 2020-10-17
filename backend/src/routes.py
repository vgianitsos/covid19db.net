"""
Defines the valid routes for the backend server.
"""
from flask_restful import Resource, reqparse
from . import db, api, const

# used to parse url query parameters
parser = reqparse.RequestParser()
parser.add_argument(
    "attributes",
    type=str,
    help="Specifies which attributes to include in the response. If multiple \
    attributes are specified, they should be delimited with commas.",
)


def get_attributes(args):
    """
    Retrieves the attributes argument from args (if it exists) and transforms
    it into a frozenset. Returns the created frozenset or None if attributes was
    not specified by the client.
    """
    ret = None
    if args["attributes"] is not None:
        attributes_str = args["attributes"]
        if attributes_str.find(",") == -1:
            ret = frozenset({attributes_str})
        else:
            ret = frozenset(attributes_str.split(","))
    return ret


def validate_attributes(attributes, valid):
    """
    Validates the given attributes by ensuring each specified value is a member
    of the given set.
    """
    for attribute in attributes:
        if attribute not in valid:
            return False
    return True


def error_response(http_code, error_message):
    """
    Returns an error response with the given code and message.
    """
    return {"error": error_message}, http_code


class Countries:
    @staticmethod
    def polish_attributes(attributes):
        # add defaults to attributes if specified
        if attributes is not None:
            attributes = frozenset({"name", "codes", *attributes})
        # if attributes unspecified, include all
        else:
            attributes = frozenset(const.VALID_COUNTRIES_ATTRIBUTES)
        return attributes

    class All(Resource):
        def get(self):
            args = parser.parse_args()
            attributes = Countries.polish_attributes(get_attributes(args))
            # validate attributes parameter
            if not validate_attributes(attributes, const.VALID_COUNTRIES_ATTRIBUTES):
                return error_response(422, "Specified attributes are invalid")
            return {"message": "This is the GET on Countries.All", "attributes": list(attributes)}

    class Single(Resource):
        def get(self, identifier):
            args = parser.parse_args()
            attributes = Countries.polish_attributes(get_attributes(args))
            # validate attributes parameter
            if not validate_attributes(attributes, const.VALID_COUNTRIES_ATTRIBUTES):
                return error_response(422, "Specified attributes are invalid")
            return {
                "message": "This is the GET on Countries.Single",
                "identifier": identifier,
                "attributes": list(attributes),
            }


# adds all of the available endpoints to the given api object.
api.add_resource(Countries.All, "/countries")
api.add_resource(Countries.Single, "/countries/<identifier>")
