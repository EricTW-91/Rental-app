import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import Summary from './Summary'


const CheckoutStripe = (props) => {
 

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <Row>
              <Col>
                <Button onClick={(e)=> e.view.history.back()}>Back</Button>
              </Col>
              <Col>
                <h1>Confirm and pay</h1>
              </Col>
            </Row>

            <Row>Your trip</Row>
            {/* Shows the time users have chosen */}
            <Row>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam esse enim omnis mollitia nulla quos error perferendis debitis temporibus ducimus nesciunt at, rem, repudiandae unde incidunt soluta, voluptatibus sint deserunt dolore cum officia! Officia ipsa ut distinctio fugiat cupiditate, sapiente odio blanditiis iusto voluptate inventore at nemo voluptas ex facilis modi ad fuga fugit? Reiciendis odit corrupti tempora recusandae corporis tempore consequatur illo, alias quasi quaerat, obcaecati provident nemo commodi sint officia quod fugiat culpa eligendi nulla inventore. Ut, assumenda! Fugit repudiandae vel consequuntur fugiat tempora impedit autem, et tempore eligendi iste hic recusandae facere praesentium cumque quod nisi cum velit in maiores, reprehenderit reiciendis nam expedita! Corporis, cumque, quasi hic tempora et laboriosam distinctio nisi est provident exercitationem repellat fugiat laborum animi, recusandae possimus sequi illo autem sapiente vitae. Veritatis quidem ducimus excepturi illo sunt tempore nihil magni aspernatur, eos alias ratione consectetur fugiat quasi odio aliquid ex dicta sed accusamus maiores mollitia, sint reiciendis accusantium? Dolor ducimus omnis repudiandae. Deleniti, numquam deserunt aspernatur praesentium voluptas nobis, qui atque, mollitia ab quidem natus nulla soluta quasi reiciendis hic nemo aperiam similique asperiores vitae fuga non magni vero incidunt exercitationem? Voluptatem dolor dignissimos ut eligendi placeat totam voluptatum enim labore tenetur deleniti nobis sunt id eius molestiae, quod sequi in? Aliquid nostrum ea saepe obcaecati ad quae, sit odit id repellendus eligendi quasi dolorum. Explicabo impedit reprehenderit nihil necessitatibus non porro ex eum eveniet error aperiam dolorem, aspernatur officiis sint eaque suscipit iure temporibus laborum doloribus, reiciendis saepe corporis. Quibusdam aspernatur id doloribus distinctio itaque ea, at quam a optio excepturi alias earum esse, illo nulla modi reiciendis sit cumque iste architecto? Ex laboriosam qui exercitationem voluptate impedit suscipit saepe deleniti magnam ipsa repellat sit sed error nihil, quae enim debitis perspiciatis ducimus illum. Earum cupiditate explicabo voluptatum a possimus esse excepturi, rem error eum cumque ratione quibusdam eligendi. Necessitatibus a dolore totam consectetur eaque. Rem non sapiente quis dolores enim corporis doloribus! Asperiores animi inventore distinctio, cupiditate dolorem nihil placeat odio sed maiores, sapiente, nam aspernatur fugiat. Placeat autem maxime dolorum fugit perferendis obcaecati sed, minus blanditiis sit asperiores a eaque, beatae aspernatur ipsa impedit animi aliquam nihil error quod voluptates. Consequatur, soluta aliquid, suscipit natus ullam veniam, similique alias doloribus doloremque sunt fugiat! Earum aspernatur placeat, laboriosam rerum officiis numquam accusamus? Veritatis ab id sunt praesentium amet, necessitatibus adipisci tempore quo eum repellendus similique incidunt error dolorem nam, vel dicta sit dolores maiores aliquam ut quasi nisi eligendi perspiciatis laboriosam? Minus similique suscipit distinctio quos adipisci beatae voluptates ipsam quo voluptatem fugit corrupti quisquam quibusdam recusandae nulla quam saepe sed quis amet, porro inventore a, fugiat tempora asperiores. Eaque rem quia nemo excepturi optio illum quo, neque sit, corporis ullam aspernatur aperiam doloremque natus recusandae fugiat blanditiis mollitia commodi dignissimos nesciunt, dolorum sint! Nostrum ducimus id voluptate fugiat rem eveniet expedita laborum rerum eum. Quae, totam itaque voluptatibus nesciunt soluta et eos amet dignissimos dolorem? Quam ab facilis natus at distinctio quis inventore doloribus tempora, aspernatur magnam veritatis!</p>
            </Row>

            <Row>Pay with</Row>
            {/* Shows the payment form here */}

            <Row>
              <Button>Request to book</Button>
            </Row>
          </Col>

          <Col className='position-relative'>
            {/* Import a summary component */}
            <Summary
              name=''
              img=''
              price={0}
              checkin=''
              checkout=''
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CheckoutStripe
