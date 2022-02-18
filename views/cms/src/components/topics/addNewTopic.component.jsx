import React from 'react';
import { Modal, Form, Input } from 'antd';


class AddNewTopic extends React.Component {
    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Thêm mới chủ đề"
                okText="Thêm mới"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <Form.Item label="Tên chủ đề">
                        {getFieldDecorator('name_topic', {
                            rules: [{ required: true, message: 'Tên chủ đề không được để trống !' }],
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(AddNewTopic);
export default CollectionCreateForm;