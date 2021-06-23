# Sending JSON data & video files in react native (Android)

Following the following error: <Error: Network Error> encountered when sending JSON data and video files to a server with native react (Android), I am posting the method I used to avoid this error. I used the following packages in the project:

## Packages

| Packages | Website |
| ------ | ------ |
| axios | https://github.com/axios/axios |
| react-native-fs | https://github.com/itinance/react-native-fs |

## Modification

You need to modify the ReactNativeFlipper.java file in the android\app\src\debug\java\com\project_name directory by commenting the line as shown in the example.

```java
NetworkingModule.setCustomClientBuilder(
    new NetworkingModule.CustomClientBuilder() {
    @Override
    public void apply(OkHttpClient.Builder builder) {
        // builder.addNetworkInterceptor(new FlipperOkhttpInterceptor(networkFlipperPlugin));
    }
    });
client.addPlugin(networkFlipperPlugin);
client.start();
```

## Example of sending file & json

```js
try {
    const json_file = MyPath+"/Download/data.json";
    const video_1 = MyPath+"/Download/video_1.mp4";
    const video_2 = MyPath+"/Download/video_2.mp4";
    const contents_json = await RNFS.readFile(json_file);
    const formData = new FormData();

    formData.append('json', contents_json);
    formData.append('files',{
        uri: 'file://' +video_1,
        type: 'video/mp4',
        name: "video_1.mp4",
    });
    formData.append('files', {
        uri: 'file://' +video_2,
        type: 'video/mp4',
        name: "video_2.mp4",
    });

    console.log('starting');

    await axios({
        url    : 'https://api.example.com',
        method : 'POST',
        data   : formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    .then((response)=> {
        console.log("response : ", response.data);
    })
    .catch((error)=> {
        console.log("error : ", error);
    })
} catch (e) {
    alert("" + e);
}
```

