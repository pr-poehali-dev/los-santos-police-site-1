import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """API для управления новостями, достижениями и галереей"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    query_params = event.get('queryStringParameters', {})
    content_type = query_params.get('type', '')
    
    db_url = os.environ.get('DATABASE_URL')
    
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            if content_type == 'news':
                cur.execute('SELECT * FROM news ORDER BY date DESC')
            elif content_type == 'achievements':
                cur.execute('SELECT * FROM achievements ORDER BY created_at DESC')
            elif content_type == 'gallery':
                cur.execute('SELECT * FROM gallery ORDER BY created_at DESC')
            else:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid content type'}),
                    'isBase64Encoded': False
                }
            
            results = cur.fetchall()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(row) for row in results], default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if content_type == 'news':
                title = body.get('title')
                category = body.get('category')
                date = body.get('date', 'CURRENT_DATE')
                cur.execute(
                    "INSERT INTO news (title, category, date) VALUES (%s, %s, %s) RETURNING *",
                    (title, category, date)
                )
            elif content_type == 'achievements':
                title = body.get('title')
                recipient = body.get('recipient')
                date = body.get('date')
                cur.execute(
                    "INSERT INTO achievements (title, recipient, date) VALUES (%s, %s, %s) RETURNING *",
                    (title, recipient, date)
                )
            elif content_type == 'gallery':
                image_url = body.get('image_url')
                caption = body.get('caption', '')
                cur.execute(
                    "INSERT INTO gallery (image_url, caption) VALUES (%s, %s) RETURNING *",
                    (image_url, caption)
                )
            else:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid content type'}),
                    'isBase64Encoded': False
                }
            
            conn.commit()
            result = cur.fetchone()
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(result), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            item_id = query_params.get('id')
            
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID is required'}),
                    'isBase64Encoded': False
                }
            
            if content_type == 'news':
                cur.execute("DELETE FROM news WHERE id = %s", (item_id,))
            elif content_type == 'achievements':
                cur.execute("DELETE FROM achievements WHERE id = %s", (item_id,))
            elif content_type == 'gallery':
                cur.execute("DELETE FROM gallery WHERE id = %s", (item_id,))
            else:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid content type'}),
                    'isBase64Encoded': False
                }
            
            conn.commit()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Deleted successfully'}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()