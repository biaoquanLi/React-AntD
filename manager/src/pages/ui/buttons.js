import React from 'react'
import {Card,Button,Radio,Tooltip } from 'antd'
import { SearchOutlined,DownloadOutlined ,PoweroffOutlined } from '@ant-design/icons';
import './ui.less'

export default class Buttons extends React.Component{
    state = {
        loadings: [],
        size: 'default'
    }
    enterLoading = index => {
        this.setState(({ loadings }) => {
          const newLoadings = [...loadings];
          newLoadings[index] = true;
          return {
            loadings: newLoadings,
          };
        });
        setTimeout(() => {
          this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[index] = false;
    
            return {
              loadings: newLoadings,
            };
          });
        }, 6000);
      };
      handleSizeChange=(e)=>{
          this.setState({size:e.target.value})
      }
    render(){
        const { loadings,size } = this.state;
        return (
            <div  style={{width:'100%'}}>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Primary Button</Button>
                    <Button disabled>Default Button</Button>
                    <Button type="dashed">Dashed Button</Button>
                    <Button type="text">Text Button</Button>
                    <Button type="link">Link Button</Button>
                 </Card>
                 <Card title="图形按钮" className="card-wrap">
                    <Button type="primary" icon={<SearchOutlined />}>
                        Search
                        </Button>
                        <Tooltip title="search">
                        <Button shape="circle" icon={<SearchOutlined />} />
                        </Tooltip>
                        <Button icon={<SearchOutlined />}>Search</Button>
                        <Button type="primary" shape="round" icon={<DownloadOutlined />} />
                 </Card>
                 <Card title="loading按钮" className="card-wrap">
                    <Button type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)}>
                            Click me!
                            </Button>
                            <Button
                            type="primary"
                            icon={<PoweroffOutlined />}
                            loading={loadings[1]}
                            onClick={() => this.enterLoading(1)}
                            >
                            Click me!
                            </Button>
                            <Button
                            type="primary"
                            icon={<PoweroffOutlined />}
                            loading={loadings[2]}
                            onClick={() => this.enterLoading(2)}
                            />
                 </Card>
                    <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={size} onChange={this.handleSizeChange}>
                    <Radio.Button value="large">Large</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="small">Small</Radio.Button>
                    </Radio.Group>
                    <br/>
                    <hr/>
                    <Button type="primary" size={size}>
                    Primary
                    </Button>
                    <Button size={size}>Default</Button>
                    <Button type="dashed" size={size}>
                    Dashed
                    </Button>
                    <Button type="link" size={size}>
                    Link
                    </Button>
                 </Card>
            </div>
        )
    }
}
