# Losung

A web app to display the Losung for today.

## Demo

<http:/losung.devmount.de>

## Get started

1. Get all files

    ```bash
    git clone https://github.com/devmount/losung
    ```

2. Install all dependencies using [Yarn](https://yarnpkg.com)

    ```bash
    cd losung
    yarn
    ```

3. Get the CSV source file from Herrnhuter Brüdergemeinde for the current year, rename and move it to the `public` directory. This step has to be repeated every year.

    ```bash
    wget https://www.losungen.de/fileadmin/media-losungen/download/Losung_2018_CSV.zip
    unzip Losung_2018_CSV.zip
    mv "Losungen Free 2018.csv" public/2018.csv
    ```

4. Either start the development server with hot reload at localhost:8080 ...

    ```bash
    yarn serve
    ```

5. ... or create a production build with minification

    ```bash
    yarn build
    ```