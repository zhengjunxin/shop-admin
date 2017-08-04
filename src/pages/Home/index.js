import React, { Component } from 'react';
import './index.css';
import axios from 'axios'
import { Upload, message, Button, Icon } from 'antd';

const props = {
	name: 'file',
	action: '/upload',
	headers: {
		authorization: 'authorization-text',
	},
	onChange(info) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
};

class App extends Component {
	render() {
		return (
			<Upload {...props}>
				<Button>
					<Icon type="upload" /> Click to Upload
			</Button>
			</Upload>
		);
	}
	componentDidMount() {
		axios.get('/api/cart/add')
			.then(res => {
				console.log('-list-', res)
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export default App;
