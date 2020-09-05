import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button className="custom">Hello</Button>
        <Button disabled>Disabled Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
        <Button disabled btnType={ButtonType.Link} href="http://www.baidu.com">Baidu Link</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
        <Button disabled btnType={ButtonType.Link} href="http://www.baidu.com">Baidu Link Disabled Link</Button>
        <br/>
        <br/>
        <Alert type={AlertType.Success} message="this is Success alert"/>
        <Alert type={AlertType.Default} alertState={true} message="this is Default alert"/>
        <Alert type={AlertType.Warning} alertState={true} message="this is Warning alert"/>
        <Alert type={AlertType.Danger} alertState={true} message="this is Danger alert"/>
        <br/>
        <br/>
        <Menu defaultIndex={0} onSelect={(index) => alert(index)}>
          <MenuItem index={1}>cool link1</MenuItem>
          <MenuItem index={2} disabled>cool link2</MenuItem>
          <MenuItem index={3}>cool link3</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
