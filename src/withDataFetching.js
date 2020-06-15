import React from 'react'


export default function withDataFetching(WrappedComponent) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                loading: true,
                error: '',
            }
        }

        async componentDidMount() {
            try {
                const data = await fetch((this.props.dataSource);
                const data = await data.json();

                if (dataJSON) {
                    this.setState({
                        data: dataJSON,
                        loading: false,
                    });
                }
            } catch (error) {
                this.setState({
                    loading: false,
                    error: error.message,
                });
            }
        }

    }

}