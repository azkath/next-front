import { Button } from 'antd'
import Link from 'next/link'

const content = {
  marginTop: '100px',
}

export default function Home() {
  return (
    <div style={content}>
      <div className="text-center mb-5">
        <Link href="/login">
          <Button size="large" type="primary">
            Go to login
          </Button>
        </Link>
      </div>
    </div>
  )
}
