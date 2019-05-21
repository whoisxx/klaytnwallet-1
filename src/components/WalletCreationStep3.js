import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { Link } from 'react-router'
import InputCopy from 'components/InputCopy'
import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import { klayKeyMade } from 'utils/crypto'
import { KLAYTN_SCOPE_URL } from 'constants/url'
import cx from 'classnames'
import { caver } from 'klaytn/caver'
import { pipe } from 'utils/Functional'
import ui from 'utils/ui'
type Props = {

}


class WalletCreationStep3 extends Component<Props> {

  constructor(props) {
    super(props)
    const { privateKey } = this.props
    this.state = {
      userPrivateKey:'',
    }
  }
  removeData = () => {
    caver.klay.accounts.wallet.clear()
    sessionStorage.removeItem('was')
    sessionStorage.removeItem('address')
    ui.keyRemove()
  }
  movePageInfo = () => {
    browserHistory.push('/access')
  }
  movePageTransfer = () => {
    browserHistory.push('/access?next=transfer')
  }
  render() {
    const { privateKey, pageType, receiptWallet } = this.props
    let buttonList
    if(sessionStorage.getItem('was')){
      buttonList =[{ title: 'Sign in with New Account', gray: true, onClick: pipe(this.removeData, this.movePageInfo), className: 'Button--size5'},
      { title: 'View My Current Account', onClick: this.movePageInfo, className: 'Button--size5'}] 
    }else{
      buttonList = [{ title: 'View Account Info', onClick: pipe(this.removeData, this.movePageInfo), className: 'WalletCreationStep3__button Button--size5', gray: true},
      { title: 'Send KLAY & Tokens', onClick: pipe(this.removeData, this.movePageTransfer), className: 'WalletCreationStep3__button Button--size5'},]
    }
    return (
      <WalletCreationStepPlate
        className="WalletCreationStep5"
        stepName="STEP 3"
        title="Please Save your Private Key"
        description={(
          <Fragment>
            Your new account has been created.<br />
            Please copy and securely store the private key below.
          </Fragment>
        )}
        render={() => (
          <InputCopy
            value={privateKey}
            label="Private Key"
          />
        )}
        nextStepButtons={buttonList}
      />
    )
  }
}

export default WalletCreationStep3
