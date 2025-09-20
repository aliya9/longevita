from setuptools import setup

setup(
    name="function",
    version="1.0",
    py_modules=["index"],
    install_requires=[
        "boto3==1.34.0",
        "botocore==1.34.0"
    ],
)
