import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Menu,
  Select,
  Table,
} from 'antd';
import NumberFormat from 'react-number-format';
import ProductListData from 'assets/data/product-list.data.json';
import {
  DeleteOutlined,
  MoreOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';

const { Option } = Select;

const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices'];

const tableKeys = ['name', 'price', 'stock', 'category'];

const Drop = ({ menu }) => {
  return (
    <Dropdown
      onClick={(e) => e.stopPropagation()}
      overlay={menu}
      trigger={['click']}
    >
      <MoreOutlined className='dropdown-icon' style={{ fontSize: '24px' }} />
    </Dropdown>
  );
};

const CatalogProducts = () => {
  const [list, setList] = useState(ProductListData);
  const [selectRowKeys, setSelectRowKeys] = useState([]);
  const [searchTable, setSearachTable] = useState('');

  const menu = (selectedTableRow) => (
    <Menu>
      <Menu.Item onClick={() => deleteProduct(selectedTableRow.id)}>
        <DeleteOutlined style={{ fontSize: '20px' }} />
        <span>
          {!!selectRowKeys.length
            ? `Delete (${selectRowKeys.length})`
            : 'Delete'}
        </span>
      </Menu.Item>
    </Menu>
  );

  const checkStock = (stock) => {
    if (stock <= 10 && stock > 0) {
      return (
        <>
          <Badge status='warning' />
          <span className='ml-2 d-flex align-items-center'>Limited Stock</span>
        </>
      );
    }
    if (stock === 0) {
      return (
        <>
          <Badge status='error' />
          <span className='ml-2 d-flex align-items-center'>Out of Stock</span>
        </>
      );
    }
    return (
      <>
        <Badge status='success' />
        <span className='ml-2 d-flex align-items-center'>In Stock</span>
      </>
    );
  };

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Product',
      dataIndex: 'name',
      render: (_, record) => (
        <div className='d-flex align-items-center'>
          <Avatar
            size={60}
            shape='square'
            src={record.image}
            name={record.name}
          />
          <span className='ml-2 font-weight-semibold'>{record.name}</span>
        </div>
      ),
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 3,
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: {
        compare: (a, b) => a.category.localeCompare(b.category),
        multiple: 3,
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => (
        <div>
          <NumberFormat
            displayType={'text'}
            value={(Math.round(price * 100) / 100).toFixed(2)}
            prefix={'$'}
            thousandSeparator={true}
          />
        </div>
      ),
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      sorter: {
        compare: (a, b) => a.stock - b.stock,
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'stock',
      render: (stock) => <div className='d-flex'>{checkStock(stock)}</div>,
      sorter: {
        compare: (a, b) => a.stock - b.stock,
        multiple: 3,
      },
    },
    {
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className='text-right'>
          <Drop menu={menu(elm)} />
        </div>
      ),
    },
  ];

  const deleteProduct = (id) => {
    if (!!selectRowKeys.length) {
      setList((product) =>
        product.filter((item, index) => item.id !== selectRowKeys[index])
      );
      return;
    }
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const tableSearchItem = (data) => {
    return data.filter((item) =>
      tableKeys.some((category) =>
        item[category]
          .toString()
          .toLocaleLowerCase()
          .trim()
          .includes(searchTable.toLocaleLowerCase().trim())
      )
    );
  };

  const handleChangeCategory = (category) => {
    if (category !== 'All') {
      setList(ProductListData);
      setList((prev) =>
        prev.filter((item) => item.category.includes(category))
      );
      return;
    }
    setList(ProductListData);
  };

  return (
    <div>
      <Flex alignItems='center' justifyContent='between' mobileFlex={false}>
        <Flex className='mb-1' mobileFlex={false}>
          <div className='mr-md-3 mb-3'>
            <Input
              placeholder='Search'
              prefix={<SearchOutlined />}
              value={searchTable}
              onChange={(e) => setSearachTable(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Select
              defaultValue='All'
              className='w-100'
              style={{ minWidth: 180 }}
              onChange={handleChangeCategory}
              placeholder='Category'
            >
              <Option value='All'>All</Option>
              {categories.map((elm) => (
                <Option key={elm} value={elm}>
                  {elm}
                </Option>
              ))}
            </Select>
          </div>
        </Flex>
        <div>
          <Button type='primary' icon={<PlusCircleOutlined />} block>
            Add product
          </Button>
        </div>
      </Flex>
      <div>
        <Table
          columns={tableColumns}
          dataSource={tableSearchItem(list)}
          rowKey='id'
          rowSelection={{
            selectedRowKeys: selectRowKeys,
            type: 'checkbox',
            preserveSelectedRowKeys: false,
            onChange: (key) => {
              setSelectRowKeys(key);
            },
          }}
        />
      </div>
    </div>
  );
};

export default CatalogProducts;
