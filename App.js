/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import RNFS from "react-native-fs";
import axios from "axios";


class App extends Component {
	handleOnPress=async(MyPath)=>{
		try {
			const json_file = MyPath+"/Download/data.json";
			const video_1 = MyPath+"/Download/video_1.mp4";
			const video_2 = MyPath+"/Download/video_2.mp4";
			const contents_json = await RNFS.readFile(json_file);
			
			const formData = new FormData();

			formData.append('json', contents_json);
			formData.append('files',
				{
					uri: 'file://' +video_1,
					type: 'video/mp4',
					name: "video_1.mp4",
				}
			);
			formData.append('files', 
				{
					uri: 'file://' +video_2,
					type: 'video/mp4',
					name: "video_2.mp4",
				}
			);

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
	}

	render() {
		return (
			<View style={styles.screenContainer}>
				<Button title="Beusseul" onPress={()=>this.handleOnPress(RNFS.ExternalStorageDirectoryPath)}/>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		justifyContent: "center",
		padding: 16
	}
});

export default App;
